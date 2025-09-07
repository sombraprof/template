function getActiveDiscipline() {
  try {
    // O pathname será algo como /algi/ ou /tgs/index.html
    const pathSegments = window.location.pathname.split('/').filter(segment => segment);
    
    // A primeira parte do caminho é o nome da disciplina
    if (pathSegments.length > 0) {
      return pathSegments[0];
    }
    
    // Se estiver rodando na raiz (ex: localhost:8080), use uma disciplina padrão.
    // Vamos usar 'lpoo' como padrão, mas você pode alterar.
    return 'lpoo'; 
  } catch (e) {
    // Fallback em caso de erro (ex: rodando em ambiente não-navegador)
    return 'lpoo';
  }
}

export const ACTIVE_DISCIPLINE = getActiveDiscipline();
export const CONTENT_BASE_PATH = `content/${ACTIVE_DISCIPLINE}`;