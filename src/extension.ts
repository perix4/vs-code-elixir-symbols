'use strict';
import {
    ExtensionContext,
    languages
} from 'vscode';
import ElixirDocumentSymbolProvider from './elixir_document_symbol_provider'

export function activate(context: ExtensionContext) {
    context.subscriptions.push(languages.registerDocumentSymbolProvider(
        { language: "elixir" }, new ElixirDocumentSymbolProvider()
    ));
}

export function deactivate() { }