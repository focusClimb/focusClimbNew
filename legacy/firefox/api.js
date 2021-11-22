/* eslint-disable no-unused-vars */
/* global browser */

// tabs

async function getActiveTab() {
	const tabs = await browser.tabs.query({
		active: true
	});
	return tabs[0];
}

async function updateActiveTabUrl(url) {
	const tab = await getActiveTab();
	await browser.tabs.update(tab.id, {
		url: url
	});
}

// storage

function readStorage() {
	return new Promise(resolve => {
		browser.storage.sync.get(undefined, d => {
			resolve(d.data ? d.data : null);
		});
	});
}

function writeStorage(data) {
	return new Promise(resolve => {
		browser.storage.sync.set({
			data: data
		}, resolve);
	});
}

function addOnStorageChangedListener(listener) {
	browser.storage.onChanged.addListener(listener);
}

// onBeforeRequest

function addOnBeforeRequestListener(listener, urls) {
	browser.webRequest.onBeforeRequest.addListener(listener, {
		urls: urls
	}, ['blocking']);
}

function removeOnBeforeRequestListener(listener) {
	browser.webRequest.onBeforeRequest.removeListener(listener);
}

// runtime

function getResourceUrl(path) {
	return browser.runtime.getURL(path);
}
