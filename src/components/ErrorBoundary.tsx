import React, { Component, ReactNode } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuditService } from '../services/AuditService';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to audit service
    AuditService.getInstance().log('app_error', `React Error Boundary: ${error.message}`);
    
    this.setState({
      error,
      errorInfo
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View className="flex-1 bg-white justify-center items-center px-6">
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="warning-outline" size={40} color="#DC2626" />
            </View>
            
            <Text className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Oups, quelque chose s'est mal passé
            </Text>
            
            <Text className="text-gray-600 text-center mb-6 leading-relaxed">
              Une erreur inattendue s'est produite. Vos données sont en sécurité et nous avons enregistré cette erreur pour améliorer l'application.
            </Text>
          </View>

          {__DEV__ && this.state.error && (
            <View className="bg-gray-100 p-4 rounded-lg mb-6 w-full">
              <Text className="text-sm font-mono text-gray-800 mb-2">
                {this.state.error.name}: {this.state.error.message}
              </Text>
              {this.state.error.stack && (
                <Text className="text-xs font-mono text-gray-600">
                  {this.state.error.stack.substring(0, 500)}...
                </Text>
              )}
            </View>
          )}

          <View className="flex-row space-x-4">
            <Pressable
              onPress={this.handleRetry}
              className="bg-blue-600 px-6 py-3 rounded-lg flex-row items-center"
            >
              <Ionicons name="refresh-outline" size={20} color="white" />
              <Text className="text-white font-medium ml-2">Réessayer</Text>
            </Pressable>
            
            <Pressable
              onPress={() => {
                // Could add crash reporting here
                console.log('Send feedback pressed');
              }}
              className="bg-gray-200 px-6 py-3 rounded-lg flex-row items-center"
            >
              <Ionicons name="mail-outline" size={20} color="#374151" />
              <Text className="text-gray-700 font-medium ml-2">Signaler</Text>
            </Pressable>
          </View>

          <Text className="text-xs text-gray-500 mt-8 text-center">
            monVOX v1.0.0 - Vos données restent privées même en cas d'erreur
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
}