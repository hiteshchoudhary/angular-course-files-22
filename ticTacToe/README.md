https://www.npmjs.com/package/@fortawesome/angular-fontawesome

https://www.npmjs.com/package/ngx-toastr

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

handling all component state in app(app.component.ts) and rendering in the html . Pacing icon to the component icon.component.ts. Using fontawesome there to render icon(circle ,cross and pen)
