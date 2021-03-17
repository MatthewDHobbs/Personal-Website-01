<script>
    import { content } from '../content/content';
    import { selected } from '../content/selected';

    console.log($content);
    $: console.log($selected);
</script>

{#if $selected}
    <div class='card'>
        Location: { $selected.location } Item: { $selected.uuid }
    </div>
{/if}

<style>
    .card {
        position: fixed;
        color: white;
    }
</style>