<template>
    <!-- Footer Area Start Here -->
    <footer class="bg-gray-900 w-full hidden md:block h-[54px]">
        <div class="container-fluid-landing h-full flex justify-start items-center">
                <ul>
                    <router-link :to="{name:'LegalWarning'}" class="li-footer text-white text-sm font-normal mr-4">
                        {{ $utils.capitalize($t('layout.footer.legal-warning')) }}
                    </router-link>
                    <router-link :to="{name:'PrivacyPolicies'}"  class="li-footer text-white text-sm font-normal mr-4">
                        {{ $utils.capitalize($t('layout.footer.privacy-policy')) }}
                    </router-link>
                    <router-link :to="{name:'CookiePolicies'}" class="li-footer text-white text-sm font-normal mr-4">
                        {{ $utils.capitalize($t('layout.footer.privacy-cookies')) }}
                    </router-link>
                    <router-link :to="{name:'TermsConditions'}" class="li-footer text-white text-sm font-normal">
                        {{ $utils.capitalize($t('layout.footer.terms-conditions')) }}
                    </router-link>
                </ul>
        </div>
    </footer>
    <!-- Footer Area End Here -->
</template>

<script setup>
</script>
<style scoped>
    /* left-0 right-0 top-0 md:top-24 xl:top-15 */

    #footer .img-city{
        z-index: -10;
        top:0;
    }

     #footer footer{
    }

    #footer .icon:hover{
        filter: invert(53%) sepia(76%) saturate(625%) hue-rotate(354deg) brightness(107%) contrast(104%);
    }

    .h-48 {
        height: 48px!important;
    }

    .li-footer {
        display: inline; margin-right: 1rem;
        font-size: 14px;
    }

    @media(max-width: 600px){
        .li-footer {
            display: block;
        }
    }

    @media(min-width:675px){
        #footer .hicitty{
            height: 32rem;
        }
        #footer .img-city{
        }
    }
    @media(min-width:1260px){
        #footer .hicitty{
            top: 7%;
        }
        #footer .img-city{
            top: 24%;
        }
    }
    @media(min-width:1536px){
         #footer .hicitty{
            height: 32rem;
            top: 10%;
        }
        #footer .img-city{
            top: 24%;
        }
    }
</style>