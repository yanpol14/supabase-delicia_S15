// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Usa tu URL y la clave pública anon (puedes obtenerla desde tu panel de Supabase)
const supabaseUrl = "https://alyyzfrxecwzvdgygagu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseXl6ZnJ4ZWN3enZkZ3lnYWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDY0MzMsImV4cCI6MjA3OTUyMjQzM30.0Sg96kG5CrzTNsoYQHEm6lGGyQqE2gMpAgmGM9hnX3g"

export const supabase = createClient(supabaseUrl, supabaseKey)