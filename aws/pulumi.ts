import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as mime from 'mime';
import * as path from 'path';

import Util from './util';

/*
    class Pulumi extends Util

    attributes:
    - stackConfig: any
    - config: any
    - webBucket: aws.s3.Bucket
    - logBucket: aws.s3.Bucket
    - cdn: aws.cloudfront.Distribution
    - addressRecord: aws.route53.Record
    - certificateArn: pulumi.Input<string>

    methods:
    + Pulumi(string)
    - configure(string): void
    - webBucketFill(): void
    - createCertificateArn(): pulumi.Output<string>
    - createCloudfrontDistribution(): aws.cloudfront.Distribution
    - createAddressRecord(): aws.route53.Record
*/
class Pulumi extends Util {

    private stackConfig: any;
    private config: any;

    private webBucket: aws.s3.Bucket;
    private logBucket: aws.s3.Bucket;
    private cdn: aws.cloudfront.Distribution;
    private addressRecord: aws.route53.Record;
    private certificateArn: pulumi.Input<string>;

    constructor(name: string) {
        super();
        this.configure(name);
        this.certificateArn = this.config.certificateArn!;

        this.webBucket = new aws.s3.Bucket('webBucket', {
            bucket: this.config.targetDomain,
            acl: 'public-read',
            website: { indexDocument: 'index.html' }
        });
        this.logBucket = new aws.s3.Bucket('logBucket', {
            bucket: `${this.config.targetDomain}-logs`,
            acl: 'private'
        });

        this.webBucketFill();
        if (this.config.certificateArn === undefined)
            this.certificateArn = this.createCertificateArn();
        this.cdn = this.createCloudfrontDistribution();
        this.addressRecord = this.createAddressRecord(this.config.targetDomain, this.cdn);
    }

    private configure(name: string): void {
        this.stackConfig = new pulumi.Config(name);
        this.config = {
            pathToWebsiteContents: this.stackConfig.require('pathToWebsiteContents'),
            targetDomain: this.stackConfig.require('targetDomain'),
            certificateArn: this.stackConfig.get('certificateArn')
        }
    }

    private webBucketFill(): void {
        const webContentsRootPath = path.join(process.cwd(), this.config.pathToWebsiteContents);
        this.crawlDirectory(webContentsRootPath, (filePath: string) => {
            const relativeFilePath = filePath.replace(`${webContentsRootPath}/`, '');
            const contentFile = new aws.s3.BucketObject(relativeFilePath, {
                key: relativeFilePath,
                acl: 'public-read',
                bucket: this.webBucket,
                contentType: mime.getType(filePath) || undefined,
                source: new pulumi.asset.FileAsset(filePath)
            }, {
                parent: this.webBucket
            });
        });
    }

    private createCertificateArn(): pulumi.Output<string> {
        const eastRegion = new aws.Provider('east', {
            profile: aws.config.profile,
            region: 'us-east-1'
        });
        const certificate = new aws.acm.Certificate('certificate', {
            domainName: this.config.targetDomain,
            validationMethod: 'DNS'
        }, {
            provider: eastRegion
        });
        const domainParts = this.getDomainAndSubdomain(this.config.targetDomain);
        const hostedZoneId = aws.route53.getZone({ name: domainParts.parentDomain }, { async: true })
            .then(zone => zone.id);
        const certificateValidationDomain = new aws.route53.Record(`${this.config.targetDomain}-validation`, {
            name: certificate.domainValidationOptions[0].resourceRecordName,
            zoneId: hostedZoneId,
            type: certificate.domainValidationOptions[0].resourceRecordType,
            records: [certificate.domainValidationOptions[0].resourceRecordValue],
            ttl: 60
        });
        const certificateValidation = new aws.acm.CertificateValidation('cerificateValidation', {
            certificateArn: certificate.arn,
            validationRecordFqdns: [certificateValidationDomain.fqdn]
        }, {
            provider: eastRegion
        });
        return certificateValidation.certificateArn;
    }

    private createCloudfrontDistribution(): aws.cloudfront.Distribution {
        return new aws.cloudfront.Distribution('cdn', {
            enabled: true,
            aliases: [ this.config.targetDomain ],
            origins: [
                {
                    originId: this.webBucket.arn,
                    domainName: this.webBucket.websiteEndpoint,
                    customOriginConfig: {
                        originProtocolPolicy: 'http-only',
                        httpPort: 80,
                        httpsPort: 443,
                        originSslProtocols: ['TLSv1.2']
                    }
                }
            ],
            defaultRootObject: 'index.html',
            defaultCacheBehavior: {
                targetOriginId: this.webBucket.arn,
                viewerProtocolPolicy: 'redirect-to-https',
                allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
                cachedMethods: ['GET', 'HEAD', 'OPTIONS'],
                forwardedValues: {
                    cookies: { forward: 'none' },
                    queryString: false
                },
                minTtl: 0,
                defaultTtl: 60,
                maxTtl: 60
            },
            priceClass: 'PriceClass_100',
            restrictions: {
                geoRestriction: {
                    restrictionType: 'none'
                }
            },
            viewerCertificate: {
                acmCertificateArn: this.certificateArn,
                sslSupportMethod: 'sni-only'
            },
            loggingConfig: {
                bucket: this.logBucket.bucketDomainName,
                includeCookies: false,
                prefix: `${this.config.targetDomain}/`
            }
        });
    }

    private createAddressRecord(targetDomain: string, distribution: aws.cloudfront.Distribution): aws.route53.Record {
        const domainParts = this.getDomainAndSubdomain(targetDomain);
        const hostedZoneId = aws.route53.getZone({ name: domainParts.parentDomain }, { async: true })
            .then(zone => zone.id);
        return new aws.route53.Record(targetDomain, {
            name: domainParts.subdomain,
            zoneId: hostedZoneId,
            type: 'A',
            aliases: [
                {
                    name: distribution.domainName,
                    zoneId: distribution.hostedZoneId,
                    evaluateTargetHealth: true
                }
            ]
        });
    }

}

new Pulumi('personal-website');