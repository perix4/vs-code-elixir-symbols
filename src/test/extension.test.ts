
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';
import ElixirDocumentSymbolProvider from '../elixir_document_symbol_provider'

suite("Extension Tests", () => {
    test("Regex to find functions", () => {
        const provider = new ElixirDocumentSymbolProvider()
        const normal_function = "def function_name(param1, param2) do"
        const oneliner_function = "def function_name(param1, param2), do: something_else"

        assert.equal("function_name(param1, param2)", provider.matchFunction(normal_function)[1])
        assert.equal("function_name(param1, param2)", provider.matchFunction(oneliner_function)[1])
    });
});