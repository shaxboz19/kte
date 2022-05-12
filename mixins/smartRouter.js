export default {
  methods: {
    smartRouter(pathName, id) {
      console.log(pathName, id);
      if (pathName === 'Начало') {
        this.$router.push('/')
      } else if (pathName === 'Начало упражнения') {
        this.$router.push('/exercises/' + id)
      } else if (pathName === 'Выполнение упражнения') {
        this.$router.push(`/execute?id=${id}`)
      } else if (pathName === '') {
        this.$router.push('/')
      }
    }
  }
}
