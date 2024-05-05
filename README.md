[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14892159&assignment_repo_type=AssignmentRepo)
Read me, please!


```markdown
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

```

