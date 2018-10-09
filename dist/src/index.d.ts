import { InterfaceDeclaration, SourceFile, FunctionDeclaration } from "ts-simple-ast";
export interface GenerationOptions {
    path: string;
}
export interface ModelDefinition {
    iface: InterfaceDeclaration;
    file: SourceFile;
    initFn?: FunctionDeclaration;
}
export declare function createProject(settings: GenerationOptions): Promise<void>;
