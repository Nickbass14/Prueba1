//importar los modulos de angular
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';



//importar componentes a los cuales les quiero hacer una apgina exvclusiva
import {HomeComponent} from './components/home/home.component';
import{BlogComponent} from './components/blog/blog.component';
import{FormularioComponent} from './components/formulario/formulario.component';
import {HotelesComponent} from './components/hoteles/hoteles.component';
import{PaginaComponent} from './components/pagina/pagina.component';
import { ErrorComponent } from './components/error/error.component';


//Array de rutas
const appRoutes: Routes = [
    {path: '', component : HomeComponent},
    {path: 'home', component : HomeComponent},
    {path: 'blog', component : BlogComponent},
    {path: 'formulario', component : FormularioComponent},
    {path: 'hoteles', component : HotelesComponent},
    {path: 'pagina', component : PaginaComponent},
    {path: 'pagina/:nombre/:apellido', component : PaginaComponent},
    {path: '**',component: ErrorComponent}
];

//exportar el modulo de rutas
export const appRoutingProviders : any[] = [];
export const routing:  ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);