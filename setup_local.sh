#!/bin/bash

# Qiskit Code Assistant - Local Setup Script for VSCode
# This script automates the setup of the Qiskit Code Assistant VSCode extension
# with Ollama for local LLM inference.

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default model
DEFAULT_MODEL="hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF"

# Function to get model URL by name
get_model_url() {
    case "$1" in
        qwen2.5-coder-14b)
            echo "hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF"
            ;;
        mistral-small-24b)
            echo "hf.co/Qiskit/Mistral-Small-3.2-24B-Qiskit-GGUF"
            ;;
        granite-3.3-8b)
            echo "hf.co/Qiskit/Granite-3.3-8B-Qiskit-GGUF"
            ;;
        *)
            echo ""
            ;;
    esac
}

# Non-interactive mode flag
NON_INTERACTIVE=false

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_header() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo ""
}

# Function to detect OS
detect_os() {
    case "$(uname -s)" in
        Darwin*)
            echo "macos"
            ;;
        Linux*)
            echo "linux"
            ;;
        MINGW*|MSYS*|CYGWIN*)
            echo "windows"
            ;;
        *)
            echo "unknown"
            ;;
    esac
}

# Function to detect package manager (for faster Python installs)
detect_package_manager() {
    if command -v uv &> /dev/null; then
        echo "uv"
    else
        echo "pip"
    fi
}

# Function to check if VS Code is installed
check_vscode() {
    if command -v code &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to check if extension is installed
check_extension() {
    if check_vscode; then
        if code --list-extensions | grep -q "Qiskit.qiskit-vscode"; then
            return 0
        fi
    fi
    return 1
}

# Function to install or upgrade the VSCode extension
install_or_upgrade_extension() {
    print_header "VSCode Extension Setup"

    if ! check_vscode; then
        print_warning "Visual Studio Code is not installed or 'code' command is not in PATH"
        print_info "Please install VS Code from: https://code.visualstudio.com/"
        print_info "Make sure to enable 'Add to PATH' during installation"

        if [ "$NON_INTERACTIVE" = false ]; then
            read -p "Do you want to continue anyway? (y/n) " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                exit 1
            fi
        fi
        return
    fi

    print_info "Checking Qiskit Code Assistant extension..."

    if check_extension; then
        print_info "Extension is already installed. Checking for updates..."
        # Try to update the extension
        code --install-extension Qiskit.qiskit-vscode --force
        print_success "Extension updated to latest version"
    else
        print_info "Installing Qiskit Code Assistant extension..."
        code --install-extension Qiskit.qiskit-vscode
        print_success "Extension installed successfully"
    fi
}

# Function to check if Ollama is installed
check_ollama() {
    if command -v ollama &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to install Ollama
install_ollama() {
    print_header "Ollama Installation"

    if check_ollama; then
        print_success "Ollama is already installed"
        ollama --version
        return
    fi

    print_info "Ollama is not installed"

    OS=$(detect_os)

    case "$OS" in
        macos|linux)
            if [ "$NON_INTERACTIVE" = true ]; then
                print_info "Installing Ollama automatically..."
                curl -fsSL https://ollama.com/install.sh | sh
            else
                read -p "Do you want to install Ollama now? (y/n) " -n 1 -r
                echo
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    curl -fsSL https://ollama.com/install.sh | sh
                else
                    print_error "Ollama is required. Please install it from https://ollama.com"
                    exit 1
                fi
            fi
            ;;
        windows)
            print_warning "Please install Ollama manually from: https://ollama.com/download"
            print_info "After installation, run this script again"
            exit 1
            ;;
        *)
            print_error "Unsupported operating system"
            exit 1
            ;;
    esac

    if check_ollama; then
        print_success "Ollama installed successfully"
        ollama --version
    else
        print_error "Ollama installation failed"
        exit 1
    fi
}

# Function to check if Ollama is running
check_ollama_running() {
    if curl -s http://localhost:11434 > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to start Ollama service
start_ollama() {
    print_header "Starting Ollama Service"

    if check_ollama_running; then
        print_success "Ollama is already running"
        return
    fi

    print_info "Starting Ollama service..."

    OS=$(detect_os)
    case "$OS" in
        macos)
            # On macOS, Ollama should start automatically if installed via the app
            # Try to start it if it's not running
            if [ -d "/Applications/Ollama.app" ]; then
                open -a Ollama
                sleep 3
            else
                # If installed via CLI, start as background service
                ollama serve > /dev/null 2>&1 &
                sleep 3
            fi
            ;;
        linux)
            # On Linux, start as background service
            ollama serve > /dev/null 2>&1 &
            sleep 3
            ;;
        windows)
            print_info "On Windows, Ollama should start automatically"
            print_info "If not, please start Ollama manually"
            sleep 3
            ;;
    esac

    # Verify it's running
    if check_ollama_running; then
        print_success "Ollama service started successfully"
    else
        print_error "Failed to start Ollama service"
        print_info "Please start Ollama manually and run this script again"
        exit 1
    fi
}

# Function to pull and configure the model
setup_model() {
    local MODEL=$1
    print_header "Model Setup"

    print_info "Using model: $MODEL"

    # Check if model is already available
    if ollama list | grep -q "${MODEL#hf.co/Qiskit/}"; then
        print_success "Model is already available"
    else
        print_info "Downloading model (this may take a while)..."
        ollama pull "$MODEL"
        print_success "Model downloaded successfully"
    fi

    # Create a Modelfile with optimized parameters
    print_info "Creating optimized model configuration..."

    # Extract model name without the hf.co/Qiskit/ prefix and convert to lowercase
    MODEL_NAME=$(echo "${MODEL#hf.co/Qiskit/}" | tr '[:upper:]' '[:lower:]')

    cat > /tmp/qiskit-modelfile <<EOF
FROM $MODEL

PARAMETER temperature 0
PARAMETER top_k 1
PARAMETER top_p 1
PARAMETER repeat_penalty 1.05
PARAMETER num_ctx 4096

# Note: The GGUF model has an embedded chat template with a comprehensive system prompt
# Ollama automatically uses this template - no SYSTEM or TEMPLATE directive needed
EOF

    # Create the model with optimized parameters
    print_info "Creating optimized model: $MODEL_NAME"
    ollama create "$MODEL_NAME" -f /tmp/qiskit-modelfile
    rm /tmp/qiskit-modelfile

    print_success "Model configured successfully"

    # Test the model
    print_info "Testing model..."
    if echo "from qiskit import QuantumCircuit" | ollama run "$MODEL_NAME" --verbose > /dev/null 2>&1; then
        print_success "Model test successful"
    else
        print_warning "Model test returned non-zero exit code (this may be normal)"
    fi
}

# Function to configure VSCode settings
configure_vscode() {
    print_header "VSCode Configuration"

    # VSCode settings path
    if [ "$(detect_os)" = "macos" ]; then
        VSCODE_CONFIG="$HOME/Library/Application Support/Code/User/settings.json"
    elif [ "$(detect_os)" = "linux" ]; then
        VSCODE_CONFIG="$HOME/.config/Code/User/settings.json"
    elif [ "$(detect_os)" = "windows" ]; then
        VSCODE_CONFIG="$APPDATA/Code/User/settings.json"
    fi

    print_info "Configuring VSCode settings..."

    # Create config directory if it doesn't exist
    mkdir -p "$(dirname "$VSCODE_CONFIG")"

    # Check if settings.json exists
    if [ ! -f "$VSCODE_CONFIG" ]; then
        # Create new settings file
        cat > "$VSCODE_CONFIG" <<EOF
{
    "qiskitCodeAssistant.url": "http://localhost:11434",
    "qiskitCodeAssistant.enableTelemetry": false,
    "qiskitCodeAssistant.enableStreaming": true
}
EOF
        print_success "VSCode settings created"
    else
        # Update existing settings file
        print_info "Updating existing VSCode settings..."

        # Use Python to merge JSON (if available)
        if command -v python3 &> /dev/null; then
            python3 - <<EOF
import json
import sys

try:
    with open("$VSCODE_CONFIG", 'r') as f:
        settings = json.load(f)
except:
    settings = {}

settings["qiskitCodeAssistant.url"] = "http://localhost:11434"
settings["qiskitCodeAssistant.enableTelemetry"] = False
settings["qiskitCodeAssistant.enableStreaming"] = True

with open("$VSCODE_CONFIG", 'w') as f:
    json.dump(settings, f, indent=4)

print("Settings updated successfully")
EOF
            print_success "VSCode settings updated"
        else
            print_warning "Python3 not found. Please manually update your VSCode settings:"
            print_info "  1. Open VSCode"
            print_info "  2. Press Cmd/Ctrl+Shift+P"
            print_info "  3. Type 'Preferences: Open Settings (JSON)'"
            print_info "  4. Add these settings:"
            echo ""
            echo '    "qiskitCodeAssistant.url": "http://localhost:11434",'
            echo '    "qiskitCodeAssistant.enableTelemetry": false,'
            echo '    "qiskitCodeAssistant.enableStreaming": true'
            echo ""
        fi
    fi
}

# Function to show usage
show_usage() {
    cat <<EOF
Qiskit Code Assistant - Local Setup Script for VSCode

Usage: bash setup_local.sh [OPTIONS] [MODEL]

Options:
    --help, -h              Show this help message
    --list-models           List available models
    --verify                Verify current configuration
    --non-interactive, -y   Run in non-interactive mode (auto-install)

Models:
    Default: ${DEFAULT_MODEL}

    Available models:
    - qwen2.5-coder-14b     Qwen2.5-Coder 14B (best for code, ~9GB)
    - mistral-small-24b     Mistral Small 24B (most recent, ~15GB)
    - granite-3.3-8b        Granite 3.3 8B (lightweight, ~5GB)

    Or provide full model path: hf.co/Qiskit/MODEL-NAME

Examples:
    # Use default model (Qwen 14B)
    bash setup_local.sh

    # Use Mistral Small 24B
    bash setup_local.sh mistral-small-24b

    # Non-interactive mode with default model
    bash setup_local.sh --non-interactive

    # Non-interactive with specific model
    bash setup_local.sh -y granite-3.3-8b

For more information, see LOCAL_SETUP.md
EOF
}

# Function to verify configuration
verify_config() {
    print_header "Configuration Verification"

    # Check VSCode
    if check_vscode; then
        print_success "VSCode is installed"
        code --version | head -1
    else
        print_error "VSCode is not installed or 'code' command not in PATH"
    fi

    # Check extension
    if check_extension; then
        print_success "Qiskit Code Assistant extension is installed"
    else
        print_warning "Qiskit Code Assistant extension is NOT installed"
    fi

    # Check Ollama
    if check_ollama; then
        print_success "Ollama is installed"
        ollama --version
    else
        print_error "Ollama is NOT installed"
    fi

    # Check Ollama running
    if check_ollama_running; then
        print_success "Ollama service is running"
    else
        print_warning "Ollama service is NOT running"
    fi

    # Check VSCode config
    OS=$(detect_os)
    if [ "$OS" = "macos" ]; then
        VSCODE_CONFIG="$HOME/Library/Application Support/Code/User/settings.json"
    elif [ "$OS" = "linux" ]; then
        VSCODE_CONFIG="$HOME/.config/Code/User/settings.json"
    elif [ "$OS" = "windows" ]; then
        VSCODE_CONFIG="$APPDATA/Code/User/settings.json"
    fi

    if [ -f "$VSCODE_CONFIG" ]; then
        print_success "VSCode settings file exists"
        echo "  Location: $VSCODE_CONFIG"

        if grep -q "http://localhost:11434" "$VSCODE_CONFIG" 2>/dev/null; then
            print_success "Ollama URL is configured correctly"
        else
            print_warning "Ollama URL is NOT configured (or file doesn't exist)"
        fi
    else
        print_warning "VSCode settings file does NOT exist"
    fi

    # List Ollama models
    if check_ollama; then
        echo ""
        print_info "Installed Ollama models:"
        ollama list 2>/dev/null || echo "  None"
    fi

    echo ""
    print_info "Summary:"
    echo "  - If everything shows ✓, restart VSCode completely (Cmd+Q)"
    echo "  - If Ollama is not running, start it: 'ollama serve'"
    echo "  - If models are missing, run: 'bash setup_local.sh'"
}

# Function to list available models
list_models() {
    cat <<EOF
Available Qiskit Code Assistant Models:

1. Qwen2.5-Coder 14B (Default)
   - Best for code generation
   - Model: hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF
   - Size: ~9GB
   - RAM Required: 16GB+
   - Usage: bash setup_local.sh qwen2.5-coder-14b

2. Mistral Small 24B
   - Most recent model
   - Model: hf.co/Qiskit/Mistral-Small-3.2-24B-Qiskit-GGUF
   - Size: ~15GB
   - RAM Required: 24GB+
   - Usage: bash setup_local.sh mistral-small-24b

3. Granite 3.3 8B
   - Lightweight option
   - Model: hf.co/Qiskit/Granite-3.3-8B-Qiskit-GGUF
   - Size: ~5GB
   - RAM Required: 8GB+
   - Usage: bash setup_local.sh granite-3.3-8b

All models are trained on Qiskit 2.0+ and optimized for quantum computing.
EOF
}

# Main setup function
main() {
    local SELECTED_MODEL="$DEFAULT_MODEL"

    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --help|-h)
                show_usage
                exit 0
                ;;
            --list-models)
                list_models
                exit 0
                ;;
            --verify)
                verify_config
                exit 0
                ;;
            --non-interactive|-y)
                NON_INTERACTIVE=true
                shift
                ;;
            *)
                # Check if it's a model name or full path
                if [[ $1 == hf.co/* ]]; then
                    SELECTED_MODEL="$1"
                else
                    MODEL_URL=$(get_model_url "$1")
                    if [ -n "$MODEL_URL" ]; then
                        SELECTED_MODEL="$MODEL_URL"
                    else
                        print_error "Unknown model: $1"
                        print_info "Use --list-models to see available models"
                        exit 1
                    fi
                fi
                shift
                ;;
        esac
    done

    print_header "Qiskit Code Assistant - Local Setup"
    print_info "This script will set up the Qiskit Code Assistant VSCode extension with Ollama"

    if [ "$NON_INTERACTIVE" = true ]; then
        print_info "Running in non-interactive mode"
    fi

    # Run setup steps
    install_or_upgrade_extension
    install_ollama
    start_ollama
    setup_model "$SELECTED_MODEL"
    configure_vscode

    # Final message
    print_header "Setup Complete!"
    print_success "Qiskit Code Assistant is ready to use!"
    echo ""
    print_warning "IMPORTANT: You MUST completely restart VSCode for changes to take effect!"
    echo ""
    print_info "Next steps:"
    echo "  1. Quit VSCode completely (Cmd+Q on macOS, not just close window)"
    echo "  2. Wait 3-5 seconds"
    echo "  3. Restart VSCode"
    echo "  4. Verify settings: Cmd+Shift+P → 'Preferences: Open User Settings (JSON)'"
    echo "  5. Check that 'qiskitCodeAssistant.url' shows 'http://localhost:11434'"
    echo "  6. Open a Python file and press Ctrl+. to get AI-powered completions"
    echo ""
    print_info "Configuration:"
    echo "  Model: $SELECTED_MODEL"
    echo "  Ollama endpoint: http://localhost:11434"
    echo "  Settings file: $VSCODE_CONFIG"
    echo ""
    print_info "Troubleshooting:"
    echo "  - If URL still shows IBM URL, make sure you restarted VSCode (not just reloaded)"
    echo "  - Check User Settings (not Workspace Settings)"
    echo "  - See LOCAL_SETUP.md for more help"
    echo ""
}

# Run main function
main "$@"
