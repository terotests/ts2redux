import { InterfaceDeclaration, SourceFile, ClassDeclaration } from "ts-morph";
import * as R from "robowr";
export interface GenerationOptions {
    path: string;
    reducerPath?: string;
    disableDevtoolsFromContext?: boolean;
    onlyFile?: string;
    router?: boolean;
}
export interface ModelDefinition {
    name: string;
    iface: ClassDeclaration;
    file: SourceFile;
}
export interface TargetFile {
    path: string;
    file: SourceFile;
    classes: {
        [key: string]: string;
    };
}
export interface SyncInterface {
    name: string;
    file: SourceFile;
    iface: InterfaceDeclaration;
}
export interface GeneratedReducer {
    name: string;
    fileName: string;
    writer: R.CodeWriter;
    writerMainDir: string;
    writerReducerDir: string;
}
export declare function createProject(settings: GenerationOptions): Promise<void>;
