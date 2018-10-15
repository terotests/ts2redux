/**
 * Collection of some code snippets which may be useful at some day
 */
/*

          // NOTE: sync is not used ATM.
          syncInterfaces.forEach( decl => {
            console.log('SYNC', decl.name)
            if(decl.name == c.getName()) {
              console.log(`Syncing ${c.getName()} -> ${decl.iface.getName()}`)
              decl.iface.getProperties().forEach( p => {
                console.log( ' *)', p.getName())
              })
              c.getProperties().forEach( p => {
                const has = decl.iface.getProperties().filter( ip => ip.getName() == p.getName() )
                if(has.length == 0 ) {
                  const imports = decl.file.getImportDeclarations();
                  let hadImport = false
                  imports.forEach( i => {
                    // i
                    console.log('NameSpace getModuleSpecifierValue', i.getModuleSpecifierValue())
                    const ns = i.getNamespaceImport()
                    if(ns) {
                      console.log('NameSpace import', ns.getText())
                      if(ns.getText() == 'TestModelModule') hadImport = true
                    }
                    const named = i.getNamedImports()
                    named.forEach( n => {
                      console.log(' - ', n.getText())
                    })
                  })
                  if(!hadImport) {
                    const n:ImportDeclarationStructure = {moduleSpecifier:'jee'}
                    decl.file.addImportDeclaration({
                      namespaceImport:'TestModelModule',
                      moduleSpecifier: "../ng"
                  })
                  }
                }
              })
                      
            }
          })
*/ 
//# sourceMappingURL=oldcode.js.map