<template>
    <v-app class="wrapper">
        <img class="wave" src="../assets/img/wave.png" alt="wave">
        <div class="container">
            <div class="img">
                <img src="../assets/img/phone.svg" alt="phone">
            </div>
            <div class="login-content">
                <v-form v-model="isValid" @submit.prevent="submitHandler">
                    <img src="../assets/img/avatar.svg" alt="avatar">
                    <h2>Welcome</h2>
                    <div style="margin-bottom: 15px">
                    <v-text-field
                        v-model.trim="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        prepend-inner-icon="mdi-email"
                        color="#38d39f"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                    ></v-text-field>
                    </div>
                    <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        required
                        label="Password"
                        hint="At least 6 characters"
                        color="#38d39f"
                        prepend-inner-icon="mdi-lock"
                        class="input-group--focused"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        @click:append="show = !show"
                    ></v-text-field>
                    <v-btn
                        type="submit"
                        :disabled="!isValid"
                        class="btn"
                        height="50px"
                    >Login</v-btn>
                </v-form>
            </div>
        </div>

    </v-app>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    mixins: [validationMixin],
    data: () => ({
        email: "",
        password: "",
        show: false,
        isValid: false,
    }),
    validations: {
        email: { email, required },
        password: { required, maxLength: maxLength(10) }
    },
    watch: {
        error(fbError) {
            console.log(fbError)
        }
    },
    computed:{
        error() {
            return this.$store.getters.error
        },
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        passwordErrors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            !this.$v.password.maxLength && errors.push('Max 10 characters')
            return errors
        }
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }
            const formData = {
                email: this.email,
                password: this.password
            };
            try {
                await this.$store.dispatch('login', formData)
                this.$router.push("/upload");
            } catch (e) {
                this.$toast.info(`${e.message}`)
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.wrapper{
    font-family: 'Poppins', sans-serif;
    overflow: hidden;

    .wave{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 100%;
        @media screen and (max-width: 900px){
            display: none;
        }
    }

    .container{
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap :7rem;
        padding: 0 2rem;
        @media screen and (max-width: 1050px){
            grid-gap: 5rem;
        }

        .img{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            z-index: 2;

            img{
                width: 500px;
            }
            @media screen and (max-width: 1000px){
                img{
                    width: 400px;
                }
            }
        }
        @media screen and (max-width: 900px){
            grid-template-columns: 1fr;

            .img{
                display: none;
            }
        }

        .login-content{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            text-align: center;

            form{
                width: 360px;
            }

            img{
                height: 100px;
            }

            h2{
                margin: 15px 0;
                color: #333;
                text-transform: uppercase;
                font-size: 2.9rem;
            }
            @media screen and (max-width: 1000px){
                form{
                    width: 290px;
                }

                h2{
                    font-size: 2.4rem;
                    margin: 8px 0;
                }
            }

            @media screen and (max-width: 900px){
                justify-content: center;
            }

            .btn{
                width: 100%;
                border-radius: 25px;
                background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
                background-size: 200%;
                font-size: 1.2rem;
                color: #fff;
                font-family: 'Poppins', sans-serif;
                text-transform: uppercase;
                transition: .5s;

                &:hover{
                    background-position: right;
                }
            }
        }
    }
}
</style>