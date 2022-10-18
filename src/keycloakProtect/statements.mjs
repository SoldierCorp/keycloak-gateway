
export const statementsGETPOST = (token, req) => {
    if (req.method === 'GET') {
        return token.hasRealmRole('managers') ||
            token.hasRealmRole('qa') ||
            token.hasRealmRole('engineer');
    }

    if (req.method === 'POST') {
        return token.hasRealmRole('engineer')
    }


    if (req.method === 'PUT') {
        return token.hasRealmRole('engineer')
    }

    return false
}