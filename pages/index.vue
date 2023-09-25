<template>
  <div class="container">
    <Sidebar />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

.container {
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  min-height: 100vh;
  background: #ffffff;
}

.icon {
  margin: 12px;
  width: 14px;
  cursor: pointer;
}

@media screen and (max-width: 400px) {
  .sidebar {
    padding: 5px;
    width: 30%;
  }

  .note-content {
    display: flex;
    flex-direction: column;
  }

  .editor {
    padding: 10px;
    width: 70%;
  }

  .icon {
    margin: 5px 10px;
  }

  .editor .date {
    margin-top: 15px;
  }
}
</style>