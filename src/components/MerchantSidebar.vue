<template>
    <aside class="relative flex h-auto w-[280px] shrink-0 bg-white">
      <div class="flex flex-col fixed top-0 w-[280px] shrink-0 h-screen pt-[30px] px-4 gap-[30px]">
        <img src="@/assets/images/logos/logo.svg" class="h-8 w-fit" alt="logo">
        <div class="flex flex-col gap-5 h-full">
          <!-- Main Menu -->
          <nav class="flex flex-col gap-4">
            <p class="font-medium text-monday-gray">Main Menu</p>
            <ul class="flex flex-col gap-2">
              <li class="group" :class="{ active: $route.path === '/merchant-overview' }">
                <router-link to="/merchant-overview" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                  <div class="relative flex size-6 shrink-0">
                    <img src="@/assets/images/icons/home-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                    <img src="@/assets/images/icons/home-blue-fill.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    Overview
                  </p>
                  <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                </router-link>
              </li>
              <li class="group" :class="{ active: $route.path === '/transactions' }">
                <router-link to="/transactions" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                  <div class="relative flex size-6 shrink-0">
                    <img src="@/assets/images/icons/card-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                    <img src="@/assets/images/icons/card-blue-fill.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    Transactions
                  </p>
                  <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                </router-link>
              </li>
              <li class="group" :class="{ active: $route.path === '/my-merchants' }">
                <router-link to="/my-merchants" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                  <div class="relative flex size-6 shrink-0">
                    <img src="@/assets/images/icons/shop-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                    <img src="@/assets/images/icons/shop-blue-fill.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    My Merchants
                  </p>
                  <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                </router-link>
              </li>
            </ul>
          </nav>
  
          <!-- Account Settings -->
          <nav class="flex flex-col gap-4">
            <p class="font-medium text-monday-gray">Account Settings</p>
            <ul class="flex flex-col gap-2">
              <li class="group" :class="{ active: $route.path === '/settings' }">
                <router-link to="/settings" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                  <div class="relative flex size-6 shrink-0">
                    <img src="@/assets/images/icons/setting-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                    <img src="@/assets/images/icons/setting-black.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    Settings
                  </p>
                  <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                </router-link>
              </li>
              <li class="group" :class="{ active: $route.path === '/support' }">
                <router-link to="/support" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                  <div class="relative flex size-6 shrink-0">
                    <img src="@/assets/images/icons/callcenter-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                    <img src="@/assets/images/icons/callcenter-black.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                  </div>
                  <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                    Support
                  </p>
                  <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                </router-link>
              </li>
            </ul>
          </nav>
  
          <!-- Pro Upgrade Card -->
          <div class="flex flex-col rounded-t-3xl p-[18px] gap-[15px] blue-gradient mt-auto">
            <div class="relative w-fit">
              <div class="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden">
                <img src="@/assets/images/icons/crown-black-fill.svg" class="size-6" alt="icon">
              </div>
              <p class="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]">PRO</p>
            </div>
            <div class="flex flex-col gap-[18px]">
              <div class="flex flex-col gap-[6px]">
                <p class="font-medium text-monday-lime-green-char">— Access Pro Featured</p>
                <p class="font-bold text-xl text-white leading-[140%] capitalize">Seamlessly oversee, handle & perform transactions.</p>
              </div>
              <a href="#" class="font-semibold text-sm text-white hover:underline">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup>
  // Komponen sidebar merchant yang bisa digunakan kembali
  </script>
  
  <style scoped>
  .blue-gradient {
    background: linear-gradient(135deg, #0073EA 0%, #0056B3 100%);
  }
  
  .transition-300 {
    transition: all 0.3s ease;
  }
  </style> 