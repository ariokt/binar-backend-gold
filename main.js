const express = require('express');
const multer = require('multer');
const path = require('path');
const handler404 = require('./src/middleware/handler404');
const handler500 = require('./src/middleware/handler500');
const app = express();

const PORT = 8000;

app.use(express.json());

const AuthService = require('./src/service/auth');
const AuthHandler = require('./src/handler/auth');

const UserRepository = require('./src/repository/user');
const UserService = require('./src/service/user');
const UserHandler = require('./src/handler/user');

const OrderStatusRepository = require('./src/repository/orderStatus');
const OrderStatusService = require('./src/service/orderStatus');
const OrderStatusHandler = require('./src/handler/orderStatus');

const OrderRepository = require('./src/repository/order');
const OrderItemRepository = require('./src/repository/orderItem');
const OrderService = require('./src/service/order');
const OrderHandler = require('./src/handler/order');

const ItemRepository = require('./src/repository/item');
const ItemService = require('./src/service/item');
const ItemHandler = require('./src/handler/item');

const userRepository = new UserRepository();

const authService = new AuthService(userRepository);
const authHandler = new AuthHandler(authService);

const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

const orderStatusRepository = new OrderStatusRepository();
const orderStatusService = new OrderStatusService(orderStatusRepository);
const orderStatusHandler = new OrderStatusHandler(orderStatusService);

const orderRepository = new OrderRepository();
const orderItemRepository = new OrderItemRepository();
const orderService = new OrderService(orderRepository, orderItemRepository);
const orderHandler = new OrderHandler(orderService);

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemHandler = new ItemHandler(itemService);

app.post('/auth/register', authHandler.register);
app.post('/auth/login', authHandler.login);

app.get('/users', userHandler.getAll);

app.get('/orders', orderHandler.getAll);
app.post('/orders', orderHandler.create);
app.patch('/orders/:id', orderHandler.updateStatus);

app.get('/order-statuses', orderStatusHandler.getAll);
app.post('/order-statuses', orderStatusHandler.create);
app.delete('/order-statuses/:id', orderStatusHandler.delete);
app.put('/order-statuses/:id', orderStatusHandler.update);

const storageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/item');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadProductImage = multer({ storage: storageProduct });

app.get('/items', itemHandler.getAll);
app.post('/items', uploadProductImage.single('image'), itemHandler.create);
app.get('/items/:id', itemHandler.getById);
app.delete('/items/:id', itemHandler.delete);
app.put('/items/:id', uploadProductImage.single('image'), itemHandler.update);

app.get('/items/image/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'storage/item', fileName);
  res.sendFile(filePath)
})

app.use(handler404);
app.use(handler500);

app.listen(PORT, function() {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
})