<script>
    import { content } from '../content/content';
    import { selected } from '../content/selected';
</script>

<div class='c-navigation'>
    {#each $content as item}
        <div class='c-navigation-item'>
            <div class='c-navigation-item-header'>{ item.header }</div>
            <img class='c-navigation-item-chevron' src='/assets/icons/chevron-down.svg' alt='Open { item.header }'>
            <div class='c-navigation-item-dropdown-margin'>
                <div class='c-navigation-item-dropdown'>
                    <div class='c-navigation-item-dropdown-header'>{ item.header }</div>
                    {#each item.links as link}
                        {#if link.type == 'internal'}
                            <div class='c-navigation-item-dropdown-link' on:click={() => selected.set({ location: null, uuid: link.uuid })}>
                                <img class='c-navigation-item-dropdown-icon' src='/assets/icons/globe.svg' alt=''>
                                { link.subheader }
                            </div>
                        {:else if link.type == 'external'}
                            <a href={`https://${ link.link }`} target='_blank'>
                                <div class='c-navigation-item-dropdown-link'>
                                    <img class='c-navigation-item-dropdown-icon' src='/assets/icons/link-2.svg' alt=''>
                                    { link.subheader }
                                </div>
                            </a>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .c-navigation {
        margin-top: 20px;
        width: 100%;
        padding: 15px 0px;
        display: flex;
    
        font-weight: 300;
    }
    .c-navigation-item {
        margin: auto;
        display: flex;
        cursor: pointer;
        pointer-events: all;
    }
    .c-navigation-item-chevron {
        margin-left: 5px;
        opacity: 0.5;
    }
    .c-navigation-item:first-of-type { margin-left: 0px; }
    .c-navigation-item:last-of-type { margin-right: 0px; }    

    .c-navigation-item-dropdown-margin {
        position: fixed;
        z-index: 2;
        display: hidden;
        opacity: 0;
        transform: translateY(-5px);
        flex-direction: column;
        margin-top: 20px;
        margin-left: -30px;
        padding-top: 20px;
        cursor: initial;
        pointer-events: none;
        transition: .5s;
    }
    .c-navigation-item-dropdown {
        padding: 30px;
        min-width: 200px;
        text-align: left;
        border-radius: 5px;
        background: var(--white);
        color: var(--black);
        font-size: 14px;
        box-shadow: 0px 10px 30px var(--black);
    }
    .c-navigation-item-dropdown-header {
        font-weight: 400;
    }
    .c-navigation-item-dropdown-link {
        cursor: pointer;
        width: fit-content;
        margin-top: 15px;
    }
    .c-navigation-item-dropdown-icon {
        margin-right: 5px;
        margin-bottom: -2px;
    }
    .c-navigation-item-dropdown-link:hover { color: var(--blue); }
    .c-navigation-item-dropdown-link:not(:first-of-type) { margin-top: 15px; }
    .c-navigation-item:hover .c-navigation-item-dropdown-margin {
        pointer-events: all;
        display: flex;
        opacity: 1;
        transform: translateY(0px);
    }
</style>