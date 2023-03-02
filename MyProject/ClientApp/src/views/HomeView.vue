<template>
  <div class="home">
    <h1>Home</h1>
    <webix-ui :config="grid1" />
  </div>
</template>

<script setup>
var grid1 = {
  view: 'datatable',
  hover: 'hover-color',
  columns: [
    { id: 'rank', header: '', css: 'rank' },
    { id: 'title', header: 'Film title', fillspace: true },
    {
      id: 'year',
      header: [
        'Date',
        {
          content: 'multiSelectFilter',
          suggest: { fitMaster: false, width: 200 }
        }
      ]
    },
    { id: 'votes', header: 'Votes' }
  ],
  autoheight: true,
  autoConfig: true,
  scroll: 'auto',
  css: 'webix_data_border webix_header_border',
  url: 'https://desktopqa/libs/webix-pro/8.0.1//samples/15_datatable/01_loading/data/data.json'
}
</script>
