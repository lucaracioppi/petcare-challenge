<template>
  <v-container
    class="fill-height d-flex flex-column justify-center align-center"
  >
    <v-icon size="80" color="error">mdi-alert-circle-outline</v-icon>
    <h1 class="mt-4 font-weight-medium">404 - Page Not Found</h1>
    <p class="mb-4 opacity-70">La página que estás buscando no existe.</p>
    <v-btn color="primary" @click="$router.push('/dashboard')">
      Volver al Dashboard
    </v-btn>
  </v-container>
</template>
