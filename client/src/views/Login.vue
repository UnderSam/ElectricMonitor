<template>
    <div class="login pt-5">
        <b-form action="#"  @submit.prevent="login" class="w-100">
            <b-container fluid class="h-100 justify-content-center">
                <b-row class="mb-2 justify-content-center" no-gutters>
                    <b-col  col cols="10" xl="3" lg="4" md="5" sm="6">
                        <b-form-input class="rounded-0" placeholder="帳號" v-model="username" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mb-2 justify-content-center" no-gutters>
                    <b-col col cols="10" xl="3" lg="4" md="5" sm="6">
                        <b-form-input class="rounded-0" placeholder="密碼" type="password" v-model="password" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="justify-content-center" no-gutters>
                    <b-col>
                        <b-button class="rounded-0" variant="dark" type="submit">登入</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login () {
            this.$store.dispatch('loginAuth',{
                username: this.username,
                password: this.password
            })
            .then(() => {
                this.$router.push('/home')
            })

        }
    }
}
</script>
<style>
    .login {
        width: 100%;
    }
</style>