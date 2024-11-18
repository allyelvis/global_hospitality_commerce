# global_hospitality_commerce

## Overview
This project is a global hospitality and commerce system featuring:
- Hotel PMS
- Restaurant POS
- Retail POS
- Accounting Module
- E-commerce Platform
- Online Menu for Restaurants
- Car Dealer Showroom and Garage Management
- Inventory Management with Internal Requisition System
- No-Code App Builder
- AI-Powered Tools for Self-Diagnosing and Adaptive Improvement

## Features
1. Modular architecture for seamless feature integration.
2. AI-powered error handling and user recommendations.
3. Stock and inventory management with internal requisitions.
4. Multi-platform support with executable builds.
5. Dockerized services for scalability.

## Setup
Run the following script to set up the project:
```bash
chmod +x setup_global_system.sh
./setup_global_system.sh
```

## Usage
- Initialize inventory management:
  ```bash
  ./inventory_management/requisition_system.sh init
  ```
- Create a new requisition:
  ```bash
  ./inventory_management/requisition_system.sh create "Department Name" "Item Name" Quantity
  ```
- View requisitions:
  ```bash
  ./inventory_management/requisition_system.sh view
  ```

## Building and Executing
To build the executable:
```bash
./build_project.sh
```

The executable will be located in the `build` directory.

## Contributing
Feel free to contribute by submitting pull requests or issues to the GitHub repository.

## License
MIT License
