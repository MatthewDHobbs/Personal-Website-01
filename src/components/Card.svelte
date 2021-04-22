<script>
    import { content } from '../content/content';
    import { selected } from '../content/selected';
    import { locations } from '../content/locations';
    import { fade } from 'svelte/transition';

    let location;
    let index;
    let data = [];

    $: if ($selected && $selected.uuid == null) {
        location = locations[$selected.location];
        setData();
        index = 0;
    }

    $: if ($selected && $selected.location == null) {
        for (const contentGroup of $content)
            for (let i = 0; i < contentGroup.links.length; i++)
                if ($selected.uuid == contentGroup.links[i].uuid)
                    selected.set({ location: contentGroup.links[i].location, uuid: $selected.uuid });
        location = locations[$selected.location];
        setData();
        index = data.findIndex(value => $selected.uuid == value.uuid);
    }

    function setData() {
        data = [];
        for (const contentGroup of $content)
            for (let i = 0; i < contentGroup.links.length; i++)
                if ($selected.location == contentGroup.links[i].location)
                    data.push(contentGroup.links[i]);
    }

    let mobile = window.innerWidth < 1200;
    window.addEventListener('resize', () => mobile = window.innerWidth < 1200);
</script>

{#if $selected}
    <div class='card' transition:fade={{ duration: 200 }}>
        <div class='card-content'>
            <img class='icon' src='/assets/icons/chevron-left.svg' alt='Chevron Left' on:click={() => index == 0 ? index = data.length - 1 : index--}>
            <img class='icon' src='/assets/icons/chevron-right.svg' alt='Chevron Right' on:click={() => index == data.length - 1 ? index = 0 : index++}>
            <img class='icon close-icon' src='/assets/icons/x.svg' alt='Close' on:click={() => selected.set(null)}>
            <div class='card-date'>{ location.city }, { location.country } ({ data[index].date })</div>
            <div class='card-subheader'>{ data[index].subheader }</div>
            {#if !mobile}
                <div class='card-description'>{ index + 1 } / { data.length } — { data[index].description }</div>
            {:else}
                <div class='card-description'>Open on a desktop or laptop for more information.</div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .card {
        display: flex;
        margin: auto;
        width: 80%;
        max-width: 1000px;
        pointer-events: all;
        border-radius: 5px;
        background: black;
    }
    .card-content {
        width: 100%;
        padding: 30px;
        font-weight: 300;
        color: white;
    }
    .card-date {
        margin-bottom: 20px;
        opacity: 0.6;
    }
    .card-subheader {
        margin-bottom: 10px;
        font-size: 20px;
    }
    .card-description {
        line-height: 22px;
        opacity: 0.8;
    }
    .close-icon {
        float: right;
    }
    .icon {
        cursor: pointer;
        margin-bottom: 20px;
    }
    @supports ((-webkit-backdrop-filter: blur(15px)) or (backdrop-filter: blur(15px))) {
        .card {
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            background: rgba(0, 0, 0, 0.4);
        }
    }
</style>
