import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../../services/flamelink.service';
import { makeStateKey, Meta, Title, TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';

const DATA = makeStateKey<any>('home');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content: any;

  constructor(private _fl: FlamelinkService,
              private _meta: Meta,
              private _title: Title,
              private _state: TransferState) {
  }

  ngOnInit() {
    this.content = this._state.get(DATA, [] as any);

    this._fl.getApp().content.get('schemaDemo')
      .then(data => {
        this.content = data;

        this.setMetaTags(this.content.seo);
        this._state.set(DATA, data as any);
      })
      .catch(err => console.error(err));
  }

  setMetaTags(metaData) {
    this._title.setTitle(metaData.metaTitle);

    this._meta.updateTag({name: 'keywords', content: metaData.metaKeywords || ''});
    this._meta.updateTag({name: 'description', content: metaData.metaDescription || ''});
    this._meta.updateTag({name: 'og:title', content: metaData.ogTitle || ''});
    this._meta.updateTag({name: 'og:url', content: metaData.ogUrl || ''});
    this._meta.updateTag({name: 'og:type', content: metaData.ogType || 'website'});
    this._meta.updateTag({name: 'og:description', content: metaData.ogDescription || ''});
    this._meta.updateTag({name: 'og:image', content: metaData.ogImage || ''});
    this._meta.updateTag({name: 'twitter:card', content: 'summary'});
    this._meta.updateTag({name: 'twitter:title', content: metaData.twitterTitle || ''});
    this._meta.updateTag({name: 'twitter:description', content: metaData.twitterDescription || ''});
    this._meta.updateTag({name: 'twitter:url', content: metaData.twitterUrl || ''});
    this._meta.updateTag({name: 'twitter:image', content: metaData.twitterImage || ''});


  }
}
