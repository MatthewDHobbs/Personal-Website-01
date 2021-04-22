<script>
    let mobile = window.innerWidth < 1200;
    window.addEventListener('resize', () => mobile = window.innerWidth < 1200);
</script>

{#if !mobile}
    <div class='c-banner'>🚀 Incoming Software Engineer Intern at Nokia. Currently Seeking Fall 2021 Internships.</div>
{/if}

<style>
    .c-banner {
        margin-top: 40px;
        width: 100%;
        padding: 15px 0px;
        pointer-events: all;

        border-radius: 5px;
        font-weight: 300;
        background: #ffffff25;
    }
</style>
