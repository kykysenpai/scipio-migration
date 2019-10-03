import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){

  }

  transform(url: string): any {
    url = url.replace("spotify.com","spotify.com/embed");
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
