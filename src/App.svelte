<script>
    import { onMount } from 'svelte';
    import Banner from './components/Banner.svelte';
    import Navigation from './components/Navigation.svelte';
    import Header from './components/Header.svelte';
    import Card from './components/Card.svelte';

    import * as render from './animation/render';

    onMount(async () => {
        await render.loadTextures();
        await render.initialize();
        await render.display();
        document.getElementById('webgl-container').style = 'opacity: 1';
        render.animate();
    });
</script>

<section id='webgl-container'></section>

<div class='wrapper'>
    <div class='content'>
        <Banner></Banner>
        <Navigation></Navigation>
        <Header></Header>
    </div>
    <div class='card-position'>
        <Card></Card>
    </div>
</div>

<style>
    #webgl-container {
        position: fixed;
        top: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: 2s;
    }
    .wrapper {
        position: absolute;
        width: 100%;
        pointer-events: none;
        color: var(--white);
    }
    .content {
        position: relative;
        width: 80%;
        max-width: 1000px;
        display: flex;
        flex-direction: column;
        text-align: center;
        margin: auto;
        z-index: 2;
    }
    .card-position {
        position: fixed;
        width: 100%;
        bottom: 40px;
    }
</style>
