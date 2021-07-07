//importa los compentes de angular material
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule  } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule  } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';
//

const myModules = [ MatToolbarModule,
                    MatSidenavModule,
                    MatButtonModule,
                    MatMenuModule,
                    MatListModule,
                    MatIconModule,
                    MatFormFieldModule,
                    MatCardModule,
                    MatInputModule,
                    MatDialogModule,
                    FormsModule,
                    ReactiveFormsModule
 ];


@NgModule({

    imports: [ ... myModules ],

    exports: [ ... myModules ], 
})

export class MaterialModule {}

