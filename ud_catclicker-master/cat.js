/// <reference path="typings/jquery/jquery.d.ts"/>
$(document).ready(function(){

	var cats = []

	var octopus = {
		init: function(){
			adminView.init();
			model.init();
			viewCats.init();
			viewCatList.init();


		},

		getAllCats: function(){
		//pull the counters for all of cats here
			return cats
		},

		getCurrentCat: function(){
			return model.currentCat
		},

		setCurrentCat: function(cat){
			model.currentCat = cat;
			model.isAdmin = false;
			viewCats.render();
			adminView.render();		
			
			
		},

		updateCounter: function(){
			//update the current cat's counter
			model.currentCat.clicks++
			viewCats.render();
			adminView.render();
		},
		
		toggleAdmin: function(){
			model.isAdmin = !model.isAdmin
			console.log(model.isAdmin)
			adminView.render();
		},
		
		updateCat: function(newCat){
			var cc = model.currentCat
			
			cc.name = newCat.name;
			cc.picture = newCat.picture;
			cc.clicks = newCat.clicks;
			
			model.isAdmin = false;
			viewCats.render();
			adminView.render();
		}
	};
	var model = {
		currentCat: null,
		
		isAdmin: false,

		init: function(){
			if(cats.length == 0) {
				cats.push(
					{
						name: 'a',
						picture: 'cat_a.jpg',
						clicks: 0
					})

				cats.push({
						name: 'b',
						picture: 'cat_b.jpg',
						clicks: 0
					})

				cats.push({
						name: 'c',
						picture: 'cat_c.jpg',
						clicks: 0
					})
				cats.push({
						name: 'd',
						picture: 'cat_d.jpg',
						clicks: 0
					})
				cats.push({
						name: 'e',
						picture: 'cat_e.jpg',
						clicks: 0
					})
					console.log('if loop')
			}

			model.currentCat = cats[0]
			
		}
	};
	var viewCats = {
		init: function(){	
			this.catImage = document.getElementById('cat-picture')
			this.catName = document.getElementById('cat-name')
			this.catClicks = document.getElementById('cat-clicks')

			this.catImage.addEventListener('click', function(){
				octopus.updateCounter();
			})

			this.render();
		},

		render: function(){


			//get our current cat and displaythe information
			var htmlStr = ''

			var cc = octopus.getCurrentCat();
			this.catClicks.textContent = cc.clicks
			this.catImage.src = cc.picture
			this.catName.textContent = cc.name
		

		}
	};

	var viewCatList = {
		//build a list of cats
		init: function(){
			this.catList = document.getElementById('cat-list')
			this.render()
		},

		render: function(){
			var c = octopus.getAllCats();
			this.catList.innerHTML = '';

			for (i = 0; i < c.length; i++){
				cat = c[i]
				elem = document.createElement('button')
				elem.className = 'waves-effect waves-light btn'
				elem.textContent = cat.name

				elem.addEventListener('click', (function(catCopy){
					return function() {
						octopus.setCurrentCat(catCopy)
					}
				})(cat))
				this.catList.appendChild(elem);
			}
		}
	};

	var adminView = {
		init: function(){
			this.view = $('#adminView');
			this.formName = $('#form-name')
			this.formImg = $('#form-image-url');
			this.formClicks = $('#form-clicks')
			$('#adminButton').click(function(){
				octopus.toggleAdmin();
			});
			
			$('#cancel').click(function(){
				octopus.toggleAdmin()
			});
			
			
				//how do i get the form data
			$('#adminForm').submit(function(event){
				event.preventDefault();
				
				var obj = {};
				obj.name = $('#form-name').val();
				obj.clicks = $('#form-clicks').val();
				obj.picture = $('#form-image-url').val();
				
				console.log(obj)
				
				octopus.updateCat(obj);
				
			});
				
			adminView.render();
				
		},
		render: function(){
			if (model.isAdmin){
				this.view.show();
				$('#form-name').val(model.currentCat.name)
				$('#form-image-url').val(model.currentCat.picture)
				$('#form-clicks').val(model.currentCat.clicks)
			} else {
				this.view.hide();
			}
		}
	}

	octopus.init();
});
