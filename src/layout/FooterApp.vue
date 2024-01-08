<template>
    <!-- Footer Area Start Here -->
    <footer class="bg-gray-900 w-full hidden md:block h-[54px]">
        <div class="container-fluid-landing h-full flex justify-start items-center">
                <div >
                    <a href="javascript:void(0)" class="block lg:inline text-white text-sm font-normal mr-4">
                        Aviso legal
                        <!-- Legal warning
                        Avis juridique -->
                    </a>
                    <a href="javascript:void(0)" class="block lg:inline text-white text-sm font-normal mr-4">
                        Política de privacidad
                        <!-- Privacy Policy
                        Politique de confidentialité -->
                    </a>
                    <a href="javascript:void(0)" class="block lg:inline text-white text-sm font-normal mr-4">
                        Política de cookies
                        <!-- Cookies policy
                        Politique de cookies -->
                    </a>
                    <a href="javascript:void(0)" class="block lg:inline text-white text-sm font-normal">
                        Términos y condiciones
                        <!-- Terms and Conditions
                        Termes et conditions -->
                    </a>
                </div>
        </div>
    </footer>
    <!-- Footer Area End Here -->
</template>

<script>
    export default {
        data(){
            return{
                // slug_hoster:this.$page.props.user_hoster.slug,
            }
        },
        created(){
            // $(function () {
            //     $('[data-toggle="popover"]').popover()
            // })
        },
        methods:{
            redirect(){
                // this.$inertia.get(route('home'))
            }
        }
    }
</script>
<style scoped>

</style>