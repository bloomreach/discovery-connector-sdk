echo "Deleting Node Modules"
rm -rfv node_modules

echo "Deleting Node Modules in packages/api-client"
rm -rfv packages/api-client/node_modules

echo "Deleting Node Modules in packages/frontend"
rm -rfv packages/frontend/node_modules

echo "Deleting Node Modules in packages/frontend/custom-react-v1"
rm -rfv packages/frontend/react-custom/node_modules

echo "Deleting Node Modules in packages/frontend/vanilla-js"
rm -rfv packages/frontend/vanilla-js/node_modules

echo "Deleting Node Modules in packages/openapi/"
rm -rfv packages/openapi/node_modules

echo "Deleting yarn.lock"
rm -rfv yarn.lock
