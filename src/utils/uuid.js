export default function() {
    return (Math.random() + Date.now()).toString(36).replace('.', '');
} 
