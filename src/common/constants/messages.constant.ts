export const ResponseMessages = {
  SUCCESS: 'Success',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Resource not found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',

  // Auth
  REGISTER_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  EMAIL_EXIST: 'Email already registered',
  INVALID_CREDENTIALS: 'Invalid credentials',

  // Stocks
  STOCK_CREATED: 'Stock created successfully',
  STOCK_UPDATED: 'Stock updated successfully',
  STOCK_DELETED: 'Stock deleted successfully',
  STOCK_NOT_FOUND: 'Stock not found',
  STOCK_LIST_SUCCESS: 'Stocks retrieved successfully',
  STOCK_DETAIL_SUCCESS: 'Stock details retrieved successfully',

  // Watchlist
  WATCHLIST_ADDED: 'Stock added to watchlist',
  WATCHLIST_REMOVED: 'Stock removed from watchlist',
  WATCHLIST_LIST_SUCCESS: 'Watchlist retrieved successfully',
  WATCHLIST_ITEM_NOT_FOUND: 'Watchlist item not found',

  // Portfolio
  PORTFOLIO_SUCCESS: 'Portfolio retrieved successfully',

  // Trade
  TRADE_SUCCESS: 'Transaction completed successfully',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  INSUFFICIENT_SHARES: 'Insufficient stock shares',
};
