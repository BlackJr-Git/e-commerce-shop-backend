[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14892159&assignment_repo_type=AssignmentRepo)
Read me, please!



# Documentation API des Produits

Cette documentation couvre les endpoints liés à la gestion des produits dans le système. Chaque endpoint permet d'effectuer différentes opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les produits.

## Base URL

Tous les endpoints suivants sont relatifs à la base URL:

```
/api/products
```

## Endpoints

### 1. Obtenir tous les produits

- **Method**: GET
- **Endpoint**: `/`
- **Description**: Récupère une liste de tous les produits avec pagination optionnelle et recherche par nom.
- **Query Parameters**:
  - `number` (optionnel): Nombre de produits par page (par défaut: 10).
  - `pages` (optionnel): Numéro de la page actuelle (par défaut: 1).
  - `name` (optionnel): Filtrer les produits qui commencent par ce nom.
- **Successful Response**: `200 OK`
  ```json
  {
    "products": "Array of Products",
    "totalProducts": "Total Number of Products",
    "currentPage": "Current Page Number",
    "pageSize": "Number of Products per Page",
    "totalPages": "Total Number of Pages"
  }
  ```
- **Error Response**: `500 Internal Server Error`
  ```json
  "Error while fetching data"
  ```

### 2. Rechercher des produits par nom

- **Method**: GET
- **Endpoint**: `/search`
- **Description**: Recherche des produits par nom.
- **Query Parameters**:
  - `name`: Nom du produit à rechercher.
- **Successful Response**: `200 OK`
  ```json
  "Array of Products matching the name"
  ```
- **Error Response**: `404 Not Found`
  ```json
  "Le produit avec le nom : [name] n'existe pas"
  ```
  or
  ```json
  "erreur lors de la lecture des données"
  ```

### 3. Obtenir un produit par ID

- **Method**: GET
- **Endpoint**: `/:productId`
- **Description**: Récupère un produit spécifique par son ID.
- **Path Parameters**:
  - `productId`: ID du produit à récupérer.
- **Successful Response**: `200 OK`
  ```json
  "Product Object"
  ```
- **Error Response**: `404 Not Found`
  ```json
  "Le produit avec l'id : [productId] n'existe pas"
  ```

### 4. Créer un nouveau produit

- **Method**: POST
- **Endpoint**: `/add`
- **Middlewares**: `authToken`, `isAdmin`
- **Description**: Crée un nouveau produit.
- **Body**:
  - `product`: Objet produit à créer.
- **Successful Response**: `200 OK`
  ```json
  "Newly created Product Object"
  ```
- **Error Response**: `500 Internal Server Error`
  ```json
  "Une erreur est survenue lors de la création du produit"
  ```

### 5. Mettre à jour un produit par ID

- **Method**: PUT
- **Endpoint**: `/update/:productId`
- **Middlewares**: `authToken`, `isAdmin`
- **Description**: Met à jour un produit existant.
- **Path Parameters**:
  - `productId`: ID du produit à mettre à jour.
- **Body**:
  - `product`: Object produit avec les nouvelles valeurs.
- **Successful Response**: `201 Created`
  ```json
  "Updated Product Object"
  ```
- **Error Response**: `404 Not Found`
  ```json
  "Le produit avec l'id : [productId] n'existe pas"
  ```

### 6. Supprimer un produit par ID

- **Method**: DELETE
- **Endpoint**: `/delete/:productId`
- **Middlewares**: `authToken`, `isAdmin`
- **Description**: Supprime un produit spécifié par son ID.
- **Path Parameters**:
  - `productId`: ID du produit à supprimer.
- **Successful Response**: `200 OK`
  ```json
  "Deleted Product Object"
  ```
- **Error Response**: `404 Not Found`
  ```json
  "Le produit avec l'id [productId] n'a pas été trouvée."
  ```

### 7. Supprimer tous les produits

- **Method**: DELETE
- **Endpoint**: `/delete`
- **Middlewares**: `authToken`, `isAdmin`
- **Description**: Supprime tous les produits.
- **Successful Response**: `200 OK`
  ```json
  "All Products have been deleted"
  ```
- **Error Response**: `500 Internal Server Error`
  ```json
  "Une erreur est survenue lors de la suppression des données"
  ```

## Sécurité

Les endpoints pour créer, mettre à jour et supprimer des produits nécessitent une authentification et que l'utilisateur soit administrateur. Ceci est géré par les middlewares `authToken` et `isAdmin`.




# Documentation API - Gestion des Utilisateurs

Ce document décrit les endpoints disponibles pour gérer les utilisateurs dans notre système. L'API est construite avec Node.js et utilise Express comme framework.

## Endpoints

### Authentification Requise

Tous les endpoints sauf la création d'un nouvel utilisateur nécessitent une authentification.

### Récupérer tous les utilisateurs

- **URL** : `/api/users/`
- **Méthode** : `GET`
- **Authentification requise** : Oui
- **Permissions** : Admin
- **Query Params** :
  - `number` : Nombre d'utilisateurs par page
  - `pages` : Numéro de la page
- **Réponses** :
  - `200 OK` : Succès
  - `500 Internal Server Error` : Erreur serveur

### Récupérer un utilisateur par ID

- **URL** : `/api/users/:userId`
- **Méthode** : `GET`
- **Authentification requise** : Oui
- **Permissions** : Admin ou Auteur
- **URL Params** :
  - `userId` : ID de l'utilisateur
- **Réponses** :
  - `200 OK` : Succès
  - `404 Not Found` : Utilisateur non trouvé
  - `500 Internal Server Error` : Erreur serveur

### Récupérer un utilisateur par email

- **URL** : `/api/users/email/email`
- **Méthode** : `GET`
- **Authentification requise** : Oui
- **Body Params** :
  - `email` : Email de l'utilisateur
- **Réponses** :
  - `200 OK` : Succès
  - `404 Not Found` : Email non trouvé
  - `500 Internal Server Error` : Erreur serveur

### Créer un nouvel utilisateur

- **URL** : `/api/users/add`
- **Méthode** : `POST`
- **Authentification requise** : Non
- **Body Params** :
  - `email` : Email de l'utilisateur
  - `password` : Mot de passe de l'utilisateur
  - `nom` : Nom de l'utilisateur
  - `prénom` : Prénom de l'utilisateur
- **Réponses** :
  - `201 Created` : Utilisateur créé
  - `409 Conflict` : Email déjà utilisé
  - `500 Internal Server Error` : Erreur serveur

### Mettre à jour un utilisateur

- **URL** : `/api/users/update/:userId`
- **Méthode** : `PUT`
- **Authentification requise** : Oui
- **Permissions** : Admin ou Auteur
- **URL Params** :
  - `userId` : ID de l'utilisateur
- **Réponses** :
  - `201 Created` : Utilisateur mis à jour
  - `404 Not Found` : Utilisateur non trouvé
  - `500 Internal Server Error` : Erreur serveur

### Supprimer un utilisateur

- **URL** : `/api/users/delete/:userId`
- **Méthode** : `DELETE`
- **Authentification requise** : Oui
- **Permissions** : Admin ou Auteur
- **URL Params** :
  - `userId` : ID de l'utilisateur
- **Réponses** :
  - `200 OK` : Utilisateur supprimé
  - `404 Not Found` : Utilisateur non trouvé
  - `500 Internal Server Error` : Erreur serveur

### Supprimer tous les utilisateurs

- **URL** : `/api/users/delete`
- **Méthode** : `DELETE`
- **Authentification requise** : Oui
- **Permissions** : Admin
- **Réponses** :
  - `200 OK` : Tous les utilisateurs supprimés
  - `500 Internal Server Error` : Erreur serveur

## Exemples de requêtes





## Documentation API - Gestion des Commandes

### Endpoints

#### Créer une nouvelle commande

- **POST** `/add`
  - **Authorization:** Requis (token valide)
  - **Description:** Crée une nouvelle commande avec les articles spécifiés.
  - **Body:**
    ```json
    {
      "userId": "int",
      "status": "string",
      "total": "float",
      "orderItems": [
        {
          "productId": "int",
          "quantity": "int",
          "price": "float"
        }
      ]
    }
    ```

#### Récupérer toutes les commandes

- **GET** `/`
  - **Authorization:** Requis (token valide et rôle admin)
  - **Query Params:** `number` (nombre de commandes par page), `pages` (numéro de la page), `status` (filtrer par statut de commande)
  - **Description:** Renvoie une liste de toutes les commandes avec pagination et filtrage optionnel par statut.

#### Récupérer les commandes d'un utilisateur

- **GET** `/user/:userId`
  - **Authorization:** Requis (token valide, admin ou auteur de la commande)
  - **Description:** Renvoie toutes les commandes d'un utilisateur spécifique.
  - **Path Variables:** `userId` - Identifiant de l'utilisateur dont on souhaite récupérer les commandes.

#### Récupérer une commande par ID

- **GET** `/:orderId`
  - **Authorization:** Requis (token valide)
  - **Description:** Renvoie les détails d'une commande spécifique par son ID.
  - **Path Variables:** `orderId` - Identifiant de la commande à récupérer.

#### Mettre à jour une commande

- **PUT** `/update/:orderId`
  - **Authorization:** Requis (token valide)
  - **Description:** Met à jour les informations d'une commande spécifique.
  - **Path Variables:** `orderId` - Identifiant de la commande à mettre à jour.
  - **Body:** Peut contenir n'importe quel attribut d'une commande pour mise à jour.

### Exemples de Réponses



```json
{
  "id": 123,
  "userId": 1,
  "status": "en cours",
  "total": 100.50,
  "orderItems": [
    {
      "productId": 10,
      "quantity": 2,
      "price": 20.00
    }
  ]
}
```


## Documentation API - Gestion des Messages

### Endpoints

#### Créer un nouveau message

- **POST** `/send`
  - **Authorization:** Aucune spécifiée (ajoute un middleware d'authentification si nécessaire)
  - **Description:** Permet à un utilisateur de créer et d'enregistrer un nouveau message.
  - **Body:**
    ```json
    {
      "senderId": "int",
      "receiverId": "int",
      "content": "string",
      "timestamp": "datetime"
    }
    ```

#### Récupérer tous les messages

- **GET** `/`
  - **Authorization:** Requis (token valide et rôle admin)
  - **Query Params:** 
    - `number` (nombre de messages par page)
    - `pages` (numéro de la page)
  - **Description:** Renvoie une liste paginée de tous les messages, triée par date de création décroissante.

### Exemples de Réponses

#### Réponse pour la création d'un message :

```json
{
  "id": 101,
  "senderId": 1,
  "receiverId": 2,
  "content": "Bonjour, comment ça va ?",
  "timestamp": "2024-05-05T14:48:00.000Z"
}
```

#### Réponse pour récupérer tous les messages :

```json
{
  "messages": [
    {
      "id": 101,
      "senderId": 1,
      "receiverId": 2,
      "content": "Bonjour, comment ça va ?",
      "timestamp": "2024-05-05T14:48:00.000Z"
    }
  ],
  "totalMessages": 1,
  "currentPage": 1,
  "pageSize": 10,
  "totalPages": 1
}
```

### Gestion des erreurs

Il est important d'inclure des informations sur la gestion des erreurs pour que les développeurs sachent comment l'API communiquera les problèmes. Par exemple :

- **500 Internal Server Error** : Si une erreur survient lors de l'enregistrement ou de la récupération des messages.
- **401 Unauthorized** : Si l'utilisateur n'est pas correctement authentifié ou autorisé.

Voici un exemple de documentation en format Markdown pour l'API que vous avez décrite. Cette documentation détaillera chacun des endpoints ainsi que les fonctions correspondantes dans les contrôleurs.







# Documentation de l'API Auth

Cette API fournit des fonctionnalités d'authentification et de gestion des comptes utilisateurs. Elle permet l'inscription, la connexion, l'activation de compte, la déconnexion, la récupération de compte, la suppression de compte, et la vérification des droits administrateur.

## Endpoints

### Inscription

- **URL** : `/signup`
- **Méthode** : `POST`
- **Description** : Crée un nouveau compte utilisateur.
- **Corps de la requête** :
  ```json
  {
    "email": "exemple@domaine.com",
    "password": "votre_mot_de_passe"
  }
  ```
- **Réponse** : `User is created`

### Connexion

- **URL** : `/signin`
- **Méthode** : `POST`
- **Description** : Connecte un utilisateur en vérifiant son email et mot de passe.
- **Corps de la requête** :
  ```json
  {
    "email": "exemple@domaine.com",
    "password": "votre_mot_de_passe"
  }
  ```
- **Réponse** :
  - **Succès** : Retourne les informations de l'utilisateur et un token JWT.
  - **Échec** : `Le nom d'utilisateur ou le mot de passe est incorrecte`

### Activer un compte

- **URL** : `/activate-account`
- **Méthode** : `GET`
- **Description** : Active le compte utilisateur spécifié.
- **Réponse** : `User account is activated`

### Déconnexion

- **URL** : `/logout`
- **Méthode** : `GET`
- **Description** : Déconnecte l'utilisateur.
- **Réponse** : `User is logout`

### Récupération de compte

- **URL** : `/recover-account`
- **Méthode** : `POST`
- **Description** : Récupère le compte d'un utilisateur.
- **Réponse** : `User account is recovered`

### Suppression de compte

- **URL** : `/delete-account`
- **Méthode** : `POST`
- **Description** : Supprime le compte d'un utilisateur. Requiert l'authentification et des droits administrateur ou auteur.
- **Middleware** : `authToken`, `isAdminOrAuthor`
- **Réponse** : `User account is deleted`

### Vérification Administrateur

- **URL** : `/verify`
- **Méthode** : `POST`
- **Description** : Vérifie si l'utilisateur est administrateur.
- **Corps de la requête** :
  ```json
  {
    "token": "votre_token_jwt"
  }
  ```
- **Réponse** :
  - **Succès** : `true`
  - **Échec** : `token d'authentification invalide`

## Sécurité

- Assurez-vous de transmettre les informations sensibles telles que les mots de passe et les tokens via HTTPS pour protéger contre l'interception par des tiers non autorisés.
- Les tokens JWT doivent être stockés de manière sécurisée côté client et transmis uniquement lorsque nécessaire et de manière sécurisée.


## Dépendances

- Cette API utilise `Prisma` pour la gestion de la base de données, `jsonwebtoken` pour la gestion des tokens JWT et `dotenv` pour la gestion des variables d'environnement.



Pour tester ces endpoints, vous pouvez utiliser des outils comme Postman . 


