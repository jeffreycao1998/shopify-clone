npx sequelize-cli model:generate --name User --attributes email:string,password:string
npx sequelize-cli model:generate --name Product --attributes name:string,description:text,price:integer,user_id:integer
npx sequelize-cli model:generate --name Image --attributes data_url:text,product_id:integer
npx sequelize-cli model:generate --name Collection --attributes name:string,active:boolean,user_id:integer
npx sequelize-cli model:generate --name Products_Collection --attributes product_id:integer,collection_id:integer
npx sequelize-cli model:generate --name Store --attributes name:string,user_id:integer