export function buildRoutePath(path) {
    // Regex que identifica os parâmetros da rota (ex: :id)
    const routeParametersRegex = /:([a-zA-Z]+)/g;

    // Substitui cada parâmetro por um grupo nomeado que captura valores em letras minúsculas, números, traços e sublinhados
    const replacedPath = path.replace(routeParametersRegex, (_, key) => `(?<${key}>[a-z0-9\\-_]+)`);

    // Monta a regex final:
    // - ^ e $ garantem correspondência com toda a string
    // - \\/? permite uma barra final opcional
    // - (?:\\?(?<query>.*))? captura opcionalmente a query string, se houver
    const pathRegex = new RegExp(`^${replacedPath}\\/?(?:\\?(?<query>.*))?$`);

    return pathRegex;
}