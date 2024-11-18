#!/bin/bash

# Simple internal requisition system
INVENTORY_DB="inventory.db"

initialize_inventory_db() {
    sqlite3 $INVENTORY_DB "CREATE TABLE IF NOT EXISTS requisitions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        department TEXT NOT NULL,
        item TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        status TEXT DEFAULT 'Pending'
    );"
    echo "Inventory database initialized."
}

create_requisition() {
    department="$1"
    item="$2"
    quantity="$3"
    sqlite3 $INVENTORY_DB "INSERT INTO requisitions (department, item, quantity) VALUES ('$department', '$item', $quantity);"
    echo "Requisition created for $quantity $item by $department."
}

view_requisitions() {
    sqlite3 $INVENTORY_DB "SELECT * FROM requisitions;"
}

mark_as_fulfilled() {
    id="$1"
    sqlite3 $INVENTORY_DB "UPDATE requisitions SET status = 'Fulfilled' WHERE id = $id;"
    echo "Requisition $id marked as fulfilled."
}

case "$1" in
    init)
        initialize_inventory_db
        ;;
    create)
        create_requisition "$2" "$3" "$4"
        ;;
    view)
        view_requisitions
        ;;
    fulfill)
        mark_as_fulfilled "$2"
        ;;
    *)
        echo "Usage: $0 {init|create|view|fulfill}"
        ;;
esac
