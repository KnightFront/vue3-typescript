Vue.createApp({
    template: "#my-app",
    data() {
        return {
            books: [
                {
                    id: 1,
                    name: '《算法导论》',
                    date: '2006-9',
                    price: 85.00,
                    count: 1
                },
                {
                    id: 2,
                    name: '《DOM编程艺术》',
                    date: '2006-9',
                    price: 65.00,
                    count: 1
                },
                {
                    id: 3,
                    name: '《JavaScript权威指南》',
                    date: '2006-9',
                    price: 29.00,
                    count: 1
                },
                {
                    id: 4,
                    name: '《Java核心知识》',
                    date: '2006-9',
                    price: 15.00,
                    count: 1
                },
                {
                    id: 5,
                    name: '《代码整洁之道》',
                    date: '2006-9',
                    price: 133.00,
                    count: 1
                }
            ],
        };
    },
    computed: {
        // 计算书籍购买总价格
        totalPrice(){
            let finalPrice = 0;
            for (const book of this.books) {
                finalPrice += book.count * book.price;
            }
            return finalPrice;
        },
        formatPrice(price){
            return (price)=>{
                return "￥" + price
            }
        }
    },
    methods: {
        decrement(index){
            this.books[index].count--;
        },
        increment(index){
            this.books[index].count++;
        },
        removeBook(index){
            this.books.splice(index, 1);
        }
    }
}).mount('#app')
// Vue.createApp(App).mount('#app');