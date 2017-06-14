<script>
	export default {
		name: 'adata',
        data: () => {
			return {
                title: "placeholder",
                body: "some placeholder text to display before http req made.",
                thumbnailUrl: '',
                counter: 1
            }
        },
		props: {
			// ..
		},
        methods: {
            getData() {
                let id = this.counter + 1;
                this.$http.get('https://jsonplaceholder.typicode.com/photos/'+id).then(response => {
                        console.log(response, "OKEHEHEHE");
                        this.title = response.body.title;
                        this.thumbnailUrl = response.body.url;
                }, response => {
                console.log("errrrrrrrrrrr");
                });
                this.counter = id;
            }
        }
	}
</script>

<template>
	<div class="adata">
	    <button @click="getData()" type="button" name="button">Another One</button>
        <div class="info">
            <h3>{{ title }}</h3>
            <img :src="thumbnailUrl" alt="">
        </div>
	</div>

</template>

<style lang="scss">
	.adata {
	    padding: 20px;
		button {
		    color: #444;
		    padding: 5px 25px;
            border: 1px solid #444;
		}
	}
</style>
