<template>
    <div class="container">
        <AppMesage />
        <router-view />
    </div>
</template>

<script>
import AppMesage from '../components/ui/AppMessage.vue'
export default {
    components: { AppMesage },
    setup() {}
}
</script>

<style></style>
