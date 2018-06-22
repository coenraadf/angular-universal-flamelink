import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { join, resolve } from 'path';

(global as any).WebSocket = require('ws');
(global as any).XmlHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import { enableProdMode } from '@angular/core';

// import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';

import * as fs from 'fs-extra';

// add routes manually that you need rendered
const ROUTES = [
  '/',
  '/home'
];

const APP_NAME = 'angular-universal-flamelink';

// leave this as require(), imported via webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();

async function prerender() {
  // Get the app index
  const browserBuild = `dist/${APP_NAME}`;
  const index = await fs.readFile(join(browserBuild, 'index.html'), 'utf8');

  // loop over each route
  for (const route of ROUTES) {
    const pageDir = join(browserBuild, route);
    await fs.ensureDir(pageDir);

    // render with universal
    const html = await renderModuleFactory(AppServerModuleNgFactory, {
      document: index,
      url: route,
      extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
    });

    await fs.writeFile(join(pageDir, 'index.html'), html);
  }

  console.log('done rendering');
  process.exit();
}

prerender();
