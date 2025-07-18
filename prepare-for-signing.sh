#!/bin/bash

# Script para preparar AIFox para firma y distribución
# Uso: ./prepare-for-signing.sh [amo|self-hosted]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXTENSION_DIR="$SCRIPT_DIR/extension"
DIST_DIR="$SCRIPT_DIR/dist"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Función para validar la extensión
validate_extension() {
    print_status "Validando estructura de la extensión..."
    
    # Verificar que existe el directorio de extensión
    if [ ! -d "$EXTENSION_DIR" ]; then
        print_error "Directorio de extensión no encontrado: $EXTENSION_DIR"
        exit 1
    fi
    
    # Verificar manifest.json
    if [ ! -f "$EXTENSION_DIR/manifest.json" ]; then
        print_error "manifest.json no encontrado"
        exit 1
    fi
    
    # Verificar iconos requeridos
    local required_icons=("icon-16.png" "icon-32.png" "icon-48.png" "icon-128.png")
    for icon in "${required_icons[@]}"; do
        if [ ! -f "$EXTENSION_DIR/icons/$icon" ]; then
            print_error "Icono requerido no encontrado: icons/$icon"
            exit 1
        fi
    done
    
    # Verificar archivos principales
    local required_files=(
        "background.js"
        "popup/popup.html"
        "popup/popup.css" 
        "popup/popup.js"
        "sidebar/sidebar.html"
        "sidebar/sidebar.css"
        "sidebar/sidebar.js"
    )
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$EXTENSION_DIR/$file" ]; then
            print_error "Archivo requerido no encontrado: $file"
            exit 1
        fi
    done
    
    print_success "Validación de estructura completada"
}

# Función para limpiar archivos innecesarios
clean_extension() {
    print_status "Limpiando archivos innecesarios..."
    
    # Crear directorio temporal
    local temp_dir=$(mktemp -d)
    cp -r "$EXTENSION_DIR" "$temp_dir/extension"
    
    # Eliminar archivos de desarrollo
    find "$temp_dir/extension" -name "*.log" -delete
    find "$temp_dir/extension" -name "*.tmp" -delete
    find "$temp_dir/extension" -name ".DS_Store" -delete
    find "$temp_dir/extension" -name "Thumbs.db" -delete
    
    # Eliminar comentarios de desarrollo de JS (opcional)
    # find "$temp_dir/extension" -name "*.js" -exec sed -i '/^[[:space:]]*\/\//d' {} \;
    
    echo "$temp_dir/extension"
}

# Función para crear XPI para AMO
create_amo_package() {
    print_status "Creando paquete para Mozilla Add-ons (AMO)..."
    
    local clean_dir=$(clean_extension)
    
    # Crear directorio de distribución
    mkdir -p "$DIST_DIR"
    
    # Crear XPI
    cd "$clean_dir"
    zip -r "$DIST_DIR/aifox-extension-amo.xpi" . -x "*.git*" "*.svn*" "*~"
    
    # Limpiar directorio temporal
    rm -rf "$(dirname "$clean_dir")"
    
    print_success "Paquete AMO creado: $DIST_DIR/aifox-extension-amo.xpi"
}

# Función para crear XPI para distribución propia
create_self_hosted_package() {
    print_status "Creando paquete para distribución propia..."
    
    local clean_dir=$(clean_extension)
    
    # Crear directorio de distribución
    mkdir -p "$DIST_DIR"
    
    # Crear XPI
    cd "$clean_dir"
    zip -r "$DIST_DIR/aifox-extension-self-hosted.xpi" . -x "*.git*" "*.svn*" "*~"
    
    # Limpiar directorio temporal
    rm -rf "$(dirname "$clean_dir")"
    
    print_success "Paquete self-hosted creado: $DIST_DIR/aifox-extension-self-hosted.xpi"
}

# Función para verificar herramientas necesarias
check_tools() {
    print_status "Verificando herramientas necesarias..."
    
    if ! command -v zip &> /dev/null; then
        print_error "zip no está instalado. Instálalo con: apt-get install zip"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        print_warning "jq no está instalado. Recomendado para validación JSON"
    fi
    
    print_success "Herramientas verificadas"
}

# Función para mostrar información del paquete
show_package_info() {
    local xpi_file="$1"
    
    if [ -f "$xpi_file" ]; then
        local size=$(du -h "$xpi_file" | cut -f1)
        print_status "Información del paquete:"
        echo "  Archivo: $(basename "$xpi_file")"
        echo "  Tamaño: $size"
        echo "  Ubicación: $xpi_file"
        
        # Mostrar contenido del paquete
        print_status "Contenido del paquete:"
        unzip -l "$xpi_file" | head -20
    fi
}

# Función para firmar con web-ext (requiere credenciales)
sign_with_webext() {
    print_status "Firmando extensión con web-ext..."
    
    if ! command -v web-ext &> /dev/null; then
        print_error "web-ext no está instalado. Instálalo con: npm install -g web-ext"
        exit 1
    fi
    
    # Verificar variables de entorno
    if [ -z "$AMO_JWT_ISSUER" ] || [ -z "$AMO_JWT_SECRET" ]; then
        print_error "Variables de entorno requeridas:"
        echo "  export AMO_JWT_ISSUER='your-jwt-issuer'"
        echo "  export AMO_JWT_SECRET='your-jwt-secret'"
        echo ""
        echo "Obtén las credenciales en: https://addons.mozilla.org/developers/addon/api/key/"
        exit 1
    fi
    
    cd "$EXTENSION_DIR"
    web-ext sign \
        --api-key="$AMO_JWT_ISSUER" \
        --api-secret="$AMO_JWT_SECRET" \
        --channel=unlisted \
        --artifacts-dir="$DIST_DIR"
    
    print_success "Extensión firmada con web-ext"
}

# Función principal
main() {
    local mode="${1:-amo}"
    
    print_status "Preparando AIFox para firma - Modo: $mode"
    
    # Verificar herramientas
    check_tools
    
    # Validar extensión
    validate_extension
    
    case "$mode" in
        "amo")
            create_amo_package
            show_package_info "$DIST_DIR/aifox-extension-amo.xpi"
            echo ""
            print_status "Próximos pasos para AMO:"
            echo "1. Ve a https://addons.mozilla.org/developers/"
            echo "2. Crea una cuenta de desarrollador si no tienes una"
            echo "3. Sube el archivo: $DIST_DIR/aifox-extension-amo.xpi"
            echo "4. Completa la información requerida"
            echo "5. Espera la revisión automática"
            ;;
        "self-hosted")
            create_self_hosted_package
            show_package_info "$DIST_DIR/aifox-extension-self-hosted.xpi"
            echo ""
            print_status "Para firmar para distribución propia:"
            echo "1. Obtén credenciales API en: https://addons.mozilla.org/developers/addon/api/key/"
            echo "2. Exporta las variables:"
            echo "   export AMO_JWT_ISSUER='your-jwt-issuer'"
            echo "   export AMO_JWT_SECRET='your-jwt-secret'"
            echo "3. Ejecuta: $0 sign"
            ;;
        "sign")
            create_self_hosted_package
            sign_with_webext
            ;;
        *)
            print_error "Modo no válido: $mode"
            echo "Uso: $0 [amo|self-hosted|sign]"
            echo ""
            echo "Modos disponibles:"
            echo "  amo         - Crear paquete para Mozilla Add-ons"
            echo "  self-hosted - Crear paquete para distribución propia"
            echo "  sign        - Crear y firmar paquete con web-ext"
            exit 1
            ;;
    esac
    
    print_success "Proceso completado exitosamente!"
}

# Ejecutar función principal
main "$@"