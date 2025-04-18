export class SpeechRecognitionService {
  private recognition: any;
  private isInitialized: boolean = false;
  private isListening: boolean = false;
  private language: string;

  constructor(language: string = 'en-US') {
    this.language = language;
    this.initialize();
  }

  private initialize() {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.language;
      this.isInitialized = true;
    }
  }

  public start(
    onResult: (transcript: string) => void,
    onError: (error: string) => void
  ) {
    if (!this.isInitialized) {
      onError('Speech recognition is not initialized');
      return;
    }

    if (this.isListening) {
      onError('Speech recognition is already running');
      return;
    }

    try {
      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        if (event.results[0].isFinal) {
          onResult(transcript);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        let errorMessage = 'Unknown error occurred';
        
        switch (event.error) {
          case 'network':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please enable microphone access.';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.';
            break;
          default:
            errorMessage = `Error: ${event.error}`;
        }
        
        onError(errorMessage);
      };

      this.recognition.start();
    } catch (error) {
      this.isListening = false;
      onError('Error starting speech recognition: ' + (error as Error).message);
    }
  }

  public stop() {
    if (this.isInitialized && this.isListening) {
      try {
        this.recognition.stop();
        this.isListening = false;
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  }

  public isAvailable(): boolean {
    return this.isInitialized;
  }

  public isCurrentlyListening(): boolean {
    return this.isListening;
  }

  public setLanguage(language: string) {
    this.language = language;
    if (this.isInitialized) {
      this.recognition.lang = language;
    }
  }
} 