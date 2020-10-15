<template>
    <div class="text-custom">
        <v-app-bar
                color="#38d39f"
                dense
                dark
        >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>LavrovAnna</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items><v-btn text to="/">Home</v-btn></v-toolbar-items>
            <v-toolbar-items><v-btn text to="/login">Login</v-btn></v-toolbar-items>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-menu
                    left
                    bottom
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                            v-for="n in 5"
                            :key="n"
                            @click="() => {}"
                    >
                        <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
.text-custom {
    font-family: 'Poppins', sans-serif;
}

</style>