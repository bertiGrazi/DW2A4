var app = new Vue({
    el: '#app',
    data: {
        age: 17,
        list: [
            {name: 'Isadora', age: 25},
            {name: 'Grazi', age: 18},
            {name: 'Carlos', age: 60},
        ]
    },
    /*Chamar quando inicia a página */
    created() {
        this.changeAge(25)
    },
    methods: {
        changeAge(value) {
            this.age = value;

            if(this.isUnderAge) {
                console.log('tem mais de 18')
                return;
            }

            if(this.isOld) {
                console.log('Tem mais de 60')
                return;
            }

            console.log('É idade ok')
        }, 
    }, 
    computed: {
        /**Vai ficar vendo se alguma coisa mudou */
        /*Sempre vai retornar algo */
        isUnderAge() {
            return this.age < 18
        }, 
        isOld() {
            return this.age > 60
        },

        adultUsers() {
            return this.list.filter(el => el.age > 18)
        }
    }
});

