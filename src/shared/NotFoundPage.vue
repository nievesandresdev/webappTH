<template>
    <section class="h-screen w-screen flex overflow-y-auto px-4">
        <div class="m-auto lg:w-[46rem]">
            <img 
                src="/assets/img/404_image.svg" 
                alt="pagina no encontrada"
                class="h-[17.3rem] lg:h-[25rem] w-[14.6rem] lg:w-[21rem] mx-auto"
            >
            <p class="title text-center font-medium mt-8">
                La página que esta buscando no existe.
            </p>
            <p class="text-sm lg:text-22xl mt-4 text-center">
                La url no existe o ha sido cambiada
            </p>
        </div>
    </section>
</template>
<style scoped>
.title{
    font-size: 32px;
}
@media (max-width:1020px){
    .title{
        font-size: 18px;
    }   
}

</style>