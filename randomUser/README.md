# Using packages

1.  bootstrap
    using in bootstrap import in style.css(global)

2.  toast (https://www.npmjs.com/package/ngx-toastr)
    	setting css in style.css (global)
	
	and adding this app module.ts
		import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
		import { ToastrModule } from 'ngx-toastr';	

3.  FontAwesome (https://www.npmjs.com/package/@fortawesome/angular-fontawesome)
    	importing using

    	ng add @fortawesome/angular-fontawesome
    	and selecting

    	- free-regular-svg-icons
    	- free-solid-svg-icons

## Working 

Using user service to get the user form the api and then geting the user in the app Component (app.component.ts) and passing that user to the cart component
