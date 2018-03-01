'use strict';
import {
  DocumentSymbolProvider,
  TextDocument,
  CancellationToken,
  SymbolInformation,
  SymbolKind,
  Location
} from 'vscode';

export default class ElixirDocumentSymbolProvider implements DocumentSymbolProvider {
  public matchFunction(line: string) {
    const function_regex = /def(p?) (.+?\(?.*?\)?),? do/
    return line.match(function_regex)
  }
  public provideDocumentSymbols(document: TextDocument,
    token: CancellationToken): Thenable<SymbolInformation[]> {
    return new Promise((resolve, reject) => {
      let symbols = []

      for (var i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i)
        const match = this.matchFunction(line.text);
        if (match !== null) {
          symbols.push({
            name: match[2].trim(),
            kind: (match[1] == "p")? SymbolKind.Field : SymbolKind.Function,
            location: new Location(document.uri, line.range)
          })
        }
      }

      resolve(symbols);
    });
  }
}