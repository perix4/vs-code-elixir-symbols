
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';
import ElixirDocumentSymbolProvider from '../elixir_document_symbol_provider'

suite("Extension Tests", () => {
    test("Regex to find functions without parenthesis", () => {
        const provider = new ElixirDocumentSymbolProvider()

        const normal_function = "def function_name do"
        assert.equal("", provider.matchFunction(normal_function)[1])
        assert.equal("function_name", provider.matchFunction(normal_function)[2])

    });
    test("Regex to find functions", () => {
        const provider = new ElixirDocumentSymbolProvider()

        const normal_function = "def function_name(param1, param2) do"
        assert.equal("", provider.matchFunction(normal_function)[1])
        assert.equal("function_name(param1, param2)", provider.matchFunction(normal_function)[2])

    });
    test("Regex to find oneliner functions", () => {
        const provider = new ElixirDocumentSymbolProvider()

        const oneliner_function = "def function_name(param1, param2), do: something_else"
        assert.equal("", provider.matchFunction(oneliner_function)[1])
        assert.equal("function_name(param1, param2)", provider.matchFunction(oneliner_function)[2])
    });
    test("Regex to find private functions without parenthesis", () => {
        const provider = new ElixirDocumentSymbolProvider()

        const normal_function = "defp function_name do"
        assert.equal("p", provider.matchFunction(normal_function)[1])
        assert.equal("function_name", provider.matchFunction(normal_function)[2])

    });
    test("Regex to find private functions", () => {
        const provider = new ElixirDocumentSymbolProvider()

        const normal_function_private = "defp function_name(param1, param2) do"
        assert.equal("p", provider.matchFunction(normal_function_private)[1])
        assert.equal("function_name(param1, param2)", provider.matchFunction(normal_function_private)[2])
    });
    test("Regex to find private onelinerfunctions", () => {
        const provider = new ElixirDocumentSymbolProvider()

        const oneliner_function_private = "defp function_name(param1, param2), do: something_else"
        assert.equal("p", provider.matchFunction(oneliner_function_private)[1])
        assert.equal("function_name(param1, param2)", provider.matchFunction(oneliner_function_private)[2])
    });
});